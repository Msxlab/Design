import React from 'react';
import { Grid } from './Grid';

export const CountertopCanvas = ({
  countertops,
  selectedIds,
  zoom,
  showGrid,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}) => (
  <div 
    className="flex-1 relative bg-gray-50"
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
  >
    <Grid show={showGrid} />
    
    <div style={{
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
      height: '100%',
      width: '100%',
      position: 'relative'
    }}>
      {countertops.map(ct => (
        <div
          key={ct.id}
          onMouseDown={(e) => onMouseDown(e, ct.id)}
          style={{
            position: 'absolute',
            width: `${ct.width * 5}px`,
            height: `${ct.height * 5}px`,
            left: `${ct.x}px`,
            top: `${ct.y}px`,
            backgroundColor: ct.color,
            border: `${ct.edgeThickness}px solid ${selectedIds.includes(ct.id) ? '#4a90e2' : '#333'}`,
            borderRadius: `${ct.borderRadius}px`,
            transform: `rotate(${ct.rotation}deg)`,
            transition: isDragging ? 'none' : 'all 0.3s ease',
            boxShadow: selectedIds.includes(ct.id) ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <div className="absolute -top-5 w-full text-center">{ct.width.toFixed(1)}"</div>
          <div className="absolute -left-7 top-1/2 -rotate-90 origin-left">{ct.height.toFixed(1)}"</div>
        </div>
      ))}
    </div>
  </div>
);