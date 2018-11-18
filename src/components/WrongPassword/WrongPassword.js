import React from 'react'
import injectSheet from 'react-jss'

const styles = {
    container: {
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
        top: '5%',
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
        borderRadius: '5px',
        '&:hover':{
            opacity:'.7'
        }
    }
}


class errorPassword extends React.Component {

    openRef = () => {
        this.containerRef.style.transform = 'translate(-100%, 0)'
        this.props.closeDialog()
    }

    componentDidUpdate() {
        if (this.props.wrong) {
            this.containerRef.style.transform = 'translate(0)'
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div ref={e => this.containerRef = e} className={classes.container}>
                <div className={classes.boxErrorPassword}>
                    <div>WRONG PASSWORD</div>
                    <div className={classes.tryAgain} onClick={this.openRef}>TRY AGAIN</div>
                </div>
            </div>
        )
    }
}

export default injectSheet(styles)(errorPassword)