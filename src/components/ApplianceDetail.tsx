import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Cloud, ISignal } from 'nature-remo';
import CircularProgress from '@material-ui/core/CircularProgress';

const accessToken = localStorage.getItem("remoAccessToken");
const client = new Cloud(accessToken!);

function useRemo(applianceId: string) {
  const [signals, setSignals] = useState<ISignal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const featchDevices = async () => {
      setIsLoading(true);
      const data = await client.getApplianceSignals(applianceId);
      setSignals(data);
      setIsLoading(false);
    }
    featchDevices();
  }, [applianceId]);
  return [{ signals, isLoading }]
}

export function ApplianceDetail() {
  let { applianceId } = useParams();
  const [{ signals, isLoading }] = useRemo(applianceId);
  console.log(signals)
  return <>{isLoading ? <CircularProgress /> : <p>foo</p>}</>;
}