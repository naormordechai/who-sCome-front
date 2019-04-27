import React from 'react'
import Calendar from 'react-calendar';
import injectSheet from 'react-jss'

const styles = {
    container: {
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        position: 'fixed',
        backgroundColor: 'rgba(62,62,62, 0.5)',
        zIndex: '2',
        transform: 'translate(-100%, 0)',
        transition: '.3s'
    },
    boxErrorPassword: {
        position: 'relative',
        padding: '10px',
        boxShadow: '1px 2px 1px #000',
        borderRadius: '5px',
        top: '30%',
        width: '300px',
        backgroundColor: 'rgb(26,33,37)',
        margin: 'auto',
        textAlign: 'center',
        '& div:first-child': {
            color: 'red',
            fontWeight: 700,
            marginBottom: '15px'
        },
        '& div:last-child': {
            backgroundColor: '',
            cursor: 'pointer',
        }
    },
    tryAgain: {
        backgroundColor: 'rgb(47,94,133)',
        width: '50%',
        margin: '0 auto',
        height: '23px',
        borderRadius: '5px',
        '&:hover': {
            opacity: '.7'
        }
    }
}




class Dialog extends React.Component {

    openRef = () => {
        this.containerRef.style.transform = 'translate(-100%, 0)'
        this.props.closeDialog()
    }

    componentDidUpdate() {
        if (this.props.wrong) {
            this.containerRef.style.transform = 'translate(0)'
        }
    }

    getMinMxaMonth = () => {
        const fullYear = new Date().getFullYear()
        if (new Date().getMonth() === 10) {
            return {
                startMonth: new Date(),
                endMonth: new Date(fullYear + 1, 0)
            }
        } else if (new Date().getMonth() === 11) {
            return {
                startMonth: new Date(),
                endMonth: new Date(fullYear + 1, 1)
            }
        } else {
            let currentMonth = new Date().getMonth()
            return {
                startMonth: new Date(),
                endMonth: new Date(fullYear, currentMonth + 2)
            }
        }
    }

    render() {
        const { classes, yes, title, onCancel, onAccept, isCalender,
            topStyle, handlerCalenderDate, title1, action } = this.props
        return (
            <div onClick={this.openRef} ref={e => this.containerRef = e} className={classes.container}>
                <div className={classes.boxErrorPassword} style={{ top: topStyle }}>
                    {isCalender ? <div onClick={e => e.stopPropagation()}>
                        <Calendar style={{ position: 'relative', top: '0' }} className={classes.calender}
                            minDate={this.getMinMxaMonth().startMonth}
                            onChange={e => handlerCalenderDate(e)}
                            maxDetail="month"
                            maxDate={this.getMinMxaMonth().endMonth}
                        /></div> : <div>{title}</div>}
                    <div style={{ marginBottom: '15px' }} className={classes.tryAgain}>{onCancel}</div>
                    {onAccept ? <div style={{ marginTop: '20px', background: 'red' }} className={classes.tryAgain} onClick={yes}>{onAccept}</div> : null}
                    {title1 ? <div>
                        <div style={{ color: '#fff', marginBottom: '10px' }}>{title1}</div>
                        <button style={{ border: '0', outline: 'none', fontSize: '17px', color: '#fff' }} onClick={action} className={classes.tryAgain}>click here</button>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default injectSheet(styles)(Dialog)