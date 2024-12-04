import React from 'react';

export const Header = ({ date, showGrid, setShowGrid, snapToGrid, setSnapToGrid, canUndo, canRedo, onUndo, onRedo }) => (
  <div className="p-4 border-b bg-gray-50">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <span className="text-orange-500">United</span> Granite
      </h1>
      <div className="flex gap-2">
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={onUndo}
          disabled={!canUndo}
        >
          ⟲ Geri
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={onRedo}
          disabled={!canRedo}
        >
          ⟳ İleri
        </button>
        <button 
          className={`px-3 py-1 rounded ${showGrid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowGrid(!showGrid)}
        >
          Grid
        </button>
        <button 
          className={`px-3 py-1 rounded ${snapToGrid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSnapToGrid(!snapToGrid)}
        >
          Yapışkan
        </button>
      </div>
      <div>{date.toLocaleDateString('tr-TR')}</div>
    </div>
  </div>
);