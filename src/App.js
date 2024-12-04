import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CustomerForm } from './components/CustomerForm';
import { CountertopCanvas } from './components/CountertopCanvas';
import { ControlPanel } from './components/ControlPanel';
import { useHistory } from './hooks/useHistory';
import { useDrag } from './hooks/useDrag';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState({
    name: '', address: '', phone: '', email: '',
    stone: '', surface: '', edge: '', corners: '', note: '', salesperson: ''
  });
  
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const [countertops, setCountertops] = useState([{
    id: 1, width: 24, height: 24, x: 20, y: 20,
    color: '#e0e0e0', pattern: 'marble', rotation: 0,
    borderRadius: 0, depth: 1.5, edgeThickness: 1.5
  }]);

  const [selectedIds, setSelectedIds] = useState([1]);
  const [activeId, setActiveId] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const history = useHistory(countertops);
  const { isDragging, startDrag, onDrag, stopDrag } = useDrag(zoom, snapToGrid);

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({...prev, [field]: value}));
  };

  const handleMouseDown = (e, id) => {
    startDrag(e, id);
    if (e.shiftKey) {
      setSelectedIds(prev => prev.includes(id) ? prev : [...prev, id]);
    } else {
      setSelectedIds([id]);
    }
    setActiveId(id);
  };

  const handleMouseMove = (e) => {
    const delta = onDrag(e);
    if (delta) {
      setCountertops(prev => prev.map(c => 
        selectedIds.includes(c.id) ? { ...c, x: c.x + delta.x, y: c.y + delta.y } : c
      ));
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      stopDrag();
      history.push(countertops);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        date={date}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={() => setCountertops(history.undo())}
        onRedo={() => setCountertops(history.redo())}
      />

      <CustomerForm
        customerInfo={customerInfo}
        onChange={handleCustomerInfoChange}
      />

      <div className="flex flex-1">
        <CountertopCanvas
          countertops={countertops}
          selectedIds={selectedIds}
          zoom={zoom}
          showGrid={showGrid}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        <ControlPanel
          activeCountertop={countertops.find(c => c.id === activeId)}
          onUpdateCountertop={(id, field, value) => {
            const newCountertops = countertops.map(c =>
              c.id === id ? { ...c, [field]: value } : c
            );
            setCountertops(newCountertops);
            history.push(newCountertops);
          }}
          onAddCountertop={() => {
            const newId = Math.max(...countertops.map(c => c.id)) + 1;
            const newCountertops = [...countertops, {
              id: newId, width: 24, height: 24,
              x: 20, y: countertops.length * 60 + 20,
              color: '#e0e0e0', pattern: 'marble',
              rotation: 0, borderRadius: 0,
              depth: 1.5, edgeThickness: 1.5
            }];
            setCountertops(newCountertops);
            setActiveId(newId);
            setSelectedIds([newId]);
            history.push(newCountertops);
          }}
          onSplitHorizontal={() => {
            const activeCountertop = countertops.find(c => c.id === activeId);
            if (!activeCountertop) return;
            const newId = Math.max(...countertops.map(c => c.id)) + 1;
            const newHeight = activeCountertop.height / 2;
            const newCountertops = [
              ...countertops.map(c => c.id === activeId ? {...c, height: newHeight} : c),
              {...activeCountertop, id: newId, height: newHeight, y: activeCountertop.y + newHeight * 5}
            ];
            setCountertops(newCountertops);
            history.push(newCountertops);
          }}
          onSplitVertical={() => {
            const activeCountertop = countertops.find(c => c.id === activeId);
            if (!activeCountertop) return;
            const newId = Math.max(...countertops.map(c => c.id)) + 1;
            const newWidth = activeCountertop.width / 2;
            const newCountertops = [
              ...countertops.map(c => c.id === activeId ? {...c, width: newWidth} : c),
              {...activeCountertop, id: newId, width: newWidth, x: activeCountertop.x + newWidth * 5}
            ];
            setCountertops(newCountertops);
            history.push(newCountertops);
          }}
        />
      </div>
    </div>
  );
}