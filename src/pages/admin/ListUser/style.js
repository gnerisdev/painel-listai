import styled from 'styled-components';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'white',
    margin: '0 auto'
});

export const Header = styled('header')({
    backgroundColor: '#673ab7',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export const Logo = styled('div')({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
});

export const LogoIcon = styled('span')({
    backgroundColor: 'white',
    color: '#673ab7',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    fontSize: '16px'
});

export const MenuButton = styled('button')({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const Content = styled('main')({
    padding: '2rem',
    flex: 1
});

export const Title = styled('h1')({
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
});

export const SearchForm = styled('form')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',

    '@media(min-width: 768px)': {
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    '@media (max-width: 768px)': {
        flexdirection: 'column'
    }

});

export const SearchField = styled('div')({
    display: 'flex',
    flexDirection:
        'column', flex: 1,
    minWidth: '200px',

    '@media (max-width: 767px)': {
        width: '100%',
    },

    'label': {
        marginBottom: '0.25rem',
        fontSize: '0.9rem'
    },

    'input': {
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px'
    }
});

export const SearchButton = styled('button')({

    backgroundColor: '#673ab7',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    height: '38px',

    '@media (min-width: 768px)': {
        minwidth: '100px',
    },

    '@media (max-width: 767px)': {
        width: '100%',
        marginTop: '0.5rem',
    },

    '&:hover': {
        backgroundColor: '#5e35b1'
    }
});

export const Table = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed'
});

export const TableHeader = styled('thead')({
    backgroundColor: '#673ab7',
    color: 'white',

    'th': {
        padding: '0.75rem',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        '&:nth-child(1)': { width: '25%' }, 
        '&:nth-child(2)': { width: '35%' }, 
        '&:nth-child(3)': { width: '20%' }, 
        '&:nth-child(4)': { width: '20%' }, 
    },

    '@media (max-width: 767px)': {
        'th:nth-child(1)': { width: '30%' }, 
        'th:nth-child(2)': { width: '30%' }, 
        'th:nth-child(3)': { width: '20%' },
        'th:nth-child(4)': { width: '20%' } 
    }
});

export const TableBody = styled('tbody')({
    'tr': {
        backgroundColor: '#e6d9f9',

        '&:nth-child(odd)': {
            backgroundColor: '#d1c4e9'
        },

        'td': {
            padding: '0.75rem',
            borderBottom: '1px solid #c5b6e0',
            height: '40px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    }
});

export const TruncatedCell = styled('td')({
    position: 'relative',

    '&:hover::after': {
        content: 'attr(data-full-text)',
        position: 'absolute',
        left: 0,
        top: '100%',
        zIndex: 1,
        backgroundColor: '#333',
        color: 'white',
        padding: '5px 8px',
        borderRadius: '4px',
        whiteSpace: 'normal',
        maxWidth: '300px',
        wordBreak: 'break-word',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }
});