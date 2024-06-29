import { useEffect } from 'react';
import EditBusinessDetails from './editDetail';
import ServiceData from './servicesData';
import ShowMeets from './showMeet';
import { useNavigate } from 'react-router-dom';
export default function Manager() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <EditBusinessDetails style={{ alignSelf: 'flex-start', width: '100%' }} />
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '50px' }} />
        <ServiceData style={{ alignSelf: 'flex-end' }} Manager={true} />
      </div>
      <div style={{ alignSelf: 'center' }}>
        <ShowMeets />
      </div>
    </div>
  );
}