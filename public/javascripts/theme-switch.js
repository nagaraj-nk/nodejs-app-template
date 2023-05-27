/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */


const storedTheme = localStorage.getItem('theme')

const getPreferredTheme = () => {
    if (storedTheme) {
        return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#theme-label')
    $(themeSwitcher).text(initCap(theme));
}

const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
    showActiveTheme(theme);
}

setTheme(getPreferredTheme())

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
    }
})

window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.getAttribute('data-bs-theme-value')
                localStorage.setItem('theme', theme)
                setTheme(theme)
                showActiveTheme(theme, true)
            })
        })
})

const changeTheme = () => {
    if (getPreferredTheme() == 'light') {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    } else if (getPreferredTheme() == 'dark') {
        setTheme('light');
        localStorage.setItem('theme', 'light');
    }
};

function initCap(text) {
    text = ((text.charAt(0)) + "").toUpperCase() + text.substring(1, text.length);
    return text;
}