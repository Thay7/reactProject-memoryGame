import { useState, useEffect } from 'react'
import * as C from './App.styles'

import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'

import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { GridItem } from './components/GridItem'

import { GridItemType } from './types/gridItemType'
import { items } from './data/items'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'


const App = () => {
  const [playing, setPlayng] = useState<Boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [movCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([]) 

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) { setTimeElapsed(timeElapsed + 1) }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

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
      for(let w = 0; w < 2; w++) {
        for(let i = 0; i < items.length; i++) {
          let pos = -1
          while(pos < 0 || tmpGrid[pos].item !== null) {
            pos =  Math.floor(Math.random() * (items.length * 2))
          }
          tmpGrid[pos].item = i
        }
      }

    //step 2.3 - put the grid in the state
    setGridItems(tmpGrid)
  
    //step 3 -  start the game
    setPlayng(true)
  }

  const handleItemClick = (index: number) => {

  }

  return (
    <div>
      <C.Container>
        <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt=""></img>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value='0'/>
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid}/>
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>

  )
}

export default App;