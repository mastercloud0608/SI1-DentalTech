import { useState, useEffect } from "react";
import { ConfirmChanges } from '../../components/utils/ConfirmChanges';

export const useProtectedUnsavedChanges = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {

    console.log(show)
    if (show) {
      window.onbeforeunload = 'aeaa';
      <ConfirmChanges/>
    }

 
  }, [show])

  return {
    setShow
  }
}