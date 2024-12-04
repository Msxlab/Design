import React from 'react';

export const CustomerForm = ({ customerInfo, onChange }) => (
  <div className="grid grid-cols-2 gap-4 p-4 border-b">
    {Object.entries({
      'Ad Soyad': 'name', 'Adres': 'address', 'Telefon': 'phone', 'E-posta': 'email',
      'Stone': 'stone', 'Surface': 'surface', 'Edge': 'edge', 'Corners': 'corners', 
      'Note': 'note', 'Salesperson': 'salesperson'
    }).map(([label, field]) => (
      <div key={field} className="flex items-center">
        <span className="w-32 text-right pr-2 font-semibold">{label}:</span>
        <input
          className="flex-1 p-2 border rounded"
          value={customerInfo[field] || ''}
          onChange={(e) => onChange(field, e.target.value)}
        />
      </div>
    ))}
  </div>
);