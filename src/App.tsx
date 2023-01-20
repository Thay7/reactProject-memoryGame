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
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([]) 

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) { setTimeElapsed(timeElapsed + 1) }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  // verify if opened are equal
  useEffect(() => {
    if(shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true)
      if(opened.length === 2) {

        // verify 1 - if both are equal, make every "shown" permanent
        if(opened[0].item === opened[1].item) {
          let tmpGridClone = [...gridItems]
          for (let i in tmpGridClone) {
            if(tmpGridClone[i].shown) {
              tmpGridClone[i].permanentShown = true
              tmpGridClone[i].shown = false
            }
          }
          setGridItems(tmpGridClone)
          setShownCount(0)

        //verify 2 - if they are NOT equal, close all "shown"
        } else {
          setTimeout(() => {
            let tmpGridClone = [...gridItems]
            for(let i in tmpGridClone) {
              tmpGridClone[i].shown = false
            }
            setGridItems(tmpGridClone)
            setShownCount(0)
          }, 1000);
         
        }

      }
      setMoveCount(movCount => movCount + 1)

    }
    
  }, [shownCount, gridItems])

  //verify if game is over
  useEffect(() => {
    if(movCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlayng(false)
    }
  },[movCount, gridItems])


  const resetAndCreateGrid = () => {
    // step 1 - reset the game
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)

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
    if(playing && index !== null && shownCount < 2) {
      let tmpGridClone = [...gridItems]

      if(tmpGridClone[index].permanentShown === false && tmpGridClone[index].shown === false) {
        tmpGridClone[index].shown = true
        setShownCount(shownCount + 1)
      }
      setGridItems(tmpGridClone)
    }
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
          <InfoItem label='Movimentos' value={movCount.toString()}/>
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