import React from 'react'
import injectSheet from 'react-jss'

const styles = {
    searchInput: {
        margin: '10px auto',
        textAlign: 'center',
        position: 'relative',
        '& > input': {
            borderRadius: '500px',
            padding: '7px 15px',
            border: '0',
            width: '100%',
            outline: 'none',
            textAlign: 'center',
            fontSize: '17px',
            backgroundColor: 'rgb(26,33,37, .7)',
            color: '#fff',
            '&::placeholder': {
                color: '#fff',
                opacity: '.6'
            }
        }
    },
    okBtn: {
        position: 'absolute',
        top: '0px',
        right: '0',
        borderRadius: '1000px',
        fontSize: '12px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 30px',
        backgroundColor: 'rgba(47,94,133,.5)',
        border: 'none',
        outline: 'none',
        fontWeight: '700'
    },
    '@media(max-width:500px)': {
        searchInput: {
            '& > input': {
                width: '100%',
                fontSize: '3.8vw'
            }
        },
    }
}

const inputComponent = ({ classes, onChangeProps, placeholder, width, okBtn, onClickProps, textValidation, disabled }) => {
    let refInput = React.createRef()
    return (
        <div className={classes.searchInput}>
            <input
                ref={refInput}
                style={width ? { width: `${width}` } : null}
                type="text"
                placeholder={placeholder}
                onChange={onChangeProps} />
            <button
                style={textValidation ? null : { backgroundColor: 'rgb(47,94,133)' }}
                disabled={disabled}
                onClick={() => onClickProps(refInput)}
                className={classes.okBtn}>Ok</button>
        </div >
    )
}

export default injectSheet(styles)(inputComponent)