import { useState, useEffect } from 'react'
import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { GridItemType } from './types/gridItemType'
import { items } from './data/items'

const App = () => {
  const [playing, setPlayng] = useState<Boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [movCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([]) 

  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {
    // step 1 - reset the game
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    //step 2.1 - create an empty grid
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
        item: null, shown: false, permanentShown: false
      })
    
    //step 2.2 - fill the grid
      

    //step 2.3 - put the grid in the state
    setGridItems(tmpGrid)
  
    //step 3 -  start the game
    setPlayng(true)
  }

  return (
    <div>
      <C.Container>
        <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt=""></img>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label='Movimentos' value='0'/>
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid}/>
        </C.Info>
        <C.GridArea>
          <C.Grid>
            
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>

  )
}

export default App;