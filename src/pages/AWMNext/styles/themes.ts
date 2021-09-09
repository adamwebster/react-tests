import { DefaultTheme } from "styled-components"

type colorProps = {
    backgroundColor: string,
}

export type ThemeProps = DefaultTheme & {
    name: string,
    colors: colorProps,
}

export const LightTheme: ThemeProps = {
    name: 'lightTheme',
    colors: {
        backgroundColor: '#efefef',
    }
}

export const DarkTheme: ThemeProps = {
    name: 'darkMode',
    colors: {
        backgroundColor: '#000'
    }
}

