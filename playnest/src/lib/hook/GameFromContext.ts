import {GameFormFormContext} from '@/app/request-form/game'
import { useContext } from 'react'

export const useNewUserFormContext = () => {
    const context = useContext(GameFormFormContext)
    if (!context) {
      throw new Error('useNewPropertyFormContext must be used within a NewUserFormContextProvider')
    }
  
    return context
  }