import { useTheme as vuetifyUseTheme } from 'vuetify';

export const useTheme = () => {
    // create object useTheme from vuetifyUseTheme
    const theme = vuetifyUseTheme();

    // create function for load theme from localStoreage
    const loadTheme = () => {
        const storedTheme = localStorage.getItem('theme_store');
        if(storedTheme){
            theme.global.name.value = storedTheme;
        }
    }

    // create function for toggle theme
    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme';
        // save theme in to localStorage
        localStorage.setItem('theme_store', theme.global.name.value);
    }

    return{
        theme,
        loadTheme,
        toggleTheme
    }
}