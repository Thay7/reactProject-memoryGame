import { GridItemType } from '../../types/gridItemType';
import * as C from './styles'

import b7svg from '../../svgs/b7.svg'
import { items } from '../../data/items'

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container 
        showBackGroundBlue={item.permanentShown || item.shown}
        onClick={onClick}
        >
            {!item.permanentShown && !item.shown &&
            <C.Icon src={b7svg} opacity={.1} alt=""/>
            } 
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=""/>
            }
        </C.Container>
    )
}