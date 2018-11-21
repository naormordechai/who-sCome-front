import React, { Component } from 'react';
import injectSheet from 'react-jss'

const styles = {
    btnsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '5px',
        '& > *': {
            backgroundColor: 'rgb(47,94,133)',
            border: 'none',
            padding: '0 20px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '1000px',
            cursor: 'pointer',
        },
        '& div:nth-child(2)': {
            backgroundColor: 'rgb(62,62,62)'
        }

    },
    '@media(max-width:400px)': {
        btnsContainer: {
            fontSize: '3.3vw',
            '& > *': {
                height: '7vw',
                cursor:'auto'
            }
        },
    },
}

class BtnsContainer extends Component {

    render() {
        const { classes, action, title, refresh } = this.props
        return (
            <div className={classes.btnsContainer}>
                <div onClick={refresh}>Refresh</div>
                <div>Join Room</div>
                {title ? <div onClick={action}>{title}</div> : null}
            </div>
        );
    }
}

export default injectSheet(styles)(BtnsContainer);