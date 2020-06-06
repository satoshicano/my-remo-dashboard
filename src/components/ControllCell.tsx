import React from 'react'
import { IAppliance, Cloud } from 'nature-remo'
import Button from '@material-ui/core/Button';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

type Props = {
  appliance: IAppliance
}

export function ControllCell(props: Props) {

  const sendSignal = async (signalId: string) => {
    try {
      const accessToken = localStorage.getItem("remoAccessToken");
      const client = new Cloud(accessToken!);
      client.sendSignal(signalId)
    } catch (error) {
      console.error(error)
    }
  }

  const sendAirconSettings = async (buttonType: string) => {
    try {
      const accessToken = localStorage.getItem("remoAccessToken");
      const client = new Cloud(accessToken!)
      client.updateAirconSettings(props.appliance.id, {
        button: buttonType
      })
    } catch (error) {
      console.error(error)
    }
  }

  const sendTVButton = async (buttonType: string) => {
    try {
      const accessToken = localStorage.getItem("remoAccessToken");
      const client = new Cloud(accessToken!)
      client.updateTV(props.appliance.id, buttonType);
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickIRButton = (signalId: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendSignal(signalId)
  }

  const handleClickACButton = (buttonType: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendAirconSettings(buttonType)
  }

  const handleClickTVButton = (buttonType: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendTVButton(buttonType)
  }

  switch (props.appliance.type) {
    case "IR":
      return <>{props.appliance.signals.map(s =>
          <Button key={s.id} startIcon={<PowerSettingsNew />} onClick={handleClickIRButton(s.id)}>
            {s.name}
          </Button>
        )}</>

    case "AC":
      return <>
        <Button startIcon={<PowerSettingsNew />} onClick={handleClickACButton("power-on")}>
          power-on
        </Button>
        <Button startIcon={<PowerSettingsNew />} onClick={handleClickACButton("power-off")}>
          power-ff
        </Button>;
      </>

    case "TV":
      return <Button startIcon={<PowerSettingsNew />} onClick={handleClickTVButton("power")}>power</Button>;

    default:
      return <>-</>;
  }
}
