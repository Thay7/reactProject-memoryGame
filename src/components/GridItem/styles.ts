import styled from 'styled-components'

type ContainerProps = {
    showBackground: boolean
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3'}
`

export const Icon = styled.img``