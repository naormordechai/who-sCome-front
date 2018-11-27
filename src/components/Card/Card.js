import React from 'react'
import injectSheet from 'react-jss'

const styles = {
    container: {
        maxWidth: '300px',
        backgroundColor: 'rgb(26,33,37)',
        margin: 'auto',
        padding: '7px',
        borderRadius: '5px',
        transform: 'translate(0,50px)',
    },

    title: {
        borderBottom: '5px solid rgb(172,50,51)',
        fontSize: '22px',
        marginBottom: '15px'
    },
    boxPassword: {
        backgroundColor: 'rgb(36,73,103)',
        display: 'flex',
        padding: '3px',
        borderRadius: '5px',
        fontSize: '12px',
        alignItems: 'center',
        marginBottom: '5px',
        justifyContent: 'space-between',
        '& label:first-child': {
            marginLeft: '5px',
        },
        '& input': {
            backgroundColor: 'rgb(17,22,25)',
            border: '0',
            borderRadius: '5px',
            padding: '3px',
            outline: 'none',
            textAlign: 'center',
            color: '#fff',
            fontSize: '15px',
            width: '100%',
        }
    },
    submit: {
        border: '0',
        fontWeight: '700',
        width: '100%',
        height: '100%',
        fontSize: '17px',
        borderRadius: '5px',
        outline: 'none',
        cursor: 'pointer',
    },
    containerBtns: {
        display: 'flex',
        marginTop: '10px',
        textAlign: 'center',
        fontWeight: '700',
        height: '30px',
        '& div': {
            borderRadius: '5px',
            width: '50%',
            transition: '.3s',
            '& span': {
                height: '100%',
                verticalAlign: 'sub'
            }
        },
        '& div:first-child': {
            flex: '0 0 50%',
            cursor: 'pointer',
            backgroundColor: 'rgb(36,73,103)',
            marginRight: '5px',
            fontSize: '17px',
        },
        '& div:last-child': {
            flex: '1',
            backgroundColor: 'rgb(62,62,62)',
        },
        '& div:first-child:hover': {
            backgroundColor: 'rgba(36,73,103,0.5)',
        },
        '& div:last-child:hover': {
            backgroundColor: 'rgb(62,62,62,0.5)',
        },
        '& div:active': {
            outline: 'none',
        },
    },
    '@media (max-width:500px)': {
        containerBtns: {
            '& div:first-child': {
                cursor: 'auto'
            },
        },
        submit: {
            cursor: 'auto'
        }
    }
}

const onSubmit = (e, callBack) => {
    e.preventDefault()
    callBack()
}



const card = ({ classes, data, handlerText, hanlderPassword,
    handlerMaxPlayers, handlerPositiveRequest, handlerNegativeRequest,
    validateText, validateLengthText, isDisabled, marginTop }) => {
    let textInput = React.createRef();
    const validateRoomName = (isExsistRoomName, lengthTextRoomName, textInput) => {
        if (lengthTextRoomName) {
            if (isExsistRoomName.length) {
                return (
                    <div style={{ position: 'absolute', top: '40px', left: '52px', color: 'red', fontWeight: '700' }}>
                        the name is already taken
                    </div>
                )
            }
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e, handlerPositiveRequest)}>
            <div className={classes.container}>
                <div className={classes.title}>{data.header}</div>
                <div>{validateRoomName(validateText, validateLengthText, textInput)}</div>
                <div className={classes.boxPassword} style={marginTop ? { marginTop: '25px' } : { marginTop: '0' }}>
                    <div>
                        <label>{data.title1}</label>
                    </div>
                    <div>
                        <input required type="text" onChange={(e) => handlerText(e, textInput)} />
                    </div>
                </div>
                <div className={classes.boxPassword}>
                    <div>
                        <label>{data.title2}</label>
                    </div>
                    <div>
                        <input required type="password" onChange={hanlderPassword} />
                    </div>
                </div>
                <div className={classes.boxPassword}>
                    <div>
                        <label>{data.title3}</label>
                    </div>
                    <div>
                        <input required type="number" onChange={handlerMaxPlayers} />
                    </div>
                </div>
                <div className={classes.containerBtns}>
                    <div onClick={handlerNegativeRequest}>
                        <span>Cancel</span>
                    </div>
                    {isDisabled ?
                        <input type="submit" value="Create" className={classes.submit} ref={textInput} disabled={isDisabled} /> :
                        <input type="submit" value="Create" className={classes.submit} ref={textInput} disabled={isDisabled} />}
                </div>
            </div>
        </form>
    )
}


export default injectSheet(styles)(card)