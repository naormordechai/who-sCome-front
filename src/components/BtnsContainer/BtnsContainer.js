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
    selecet: {
        outline: 'none',
        textAlignLast: 'center',
        backgroundColor: 'rgb(62,62,62)',
        borderRadius:'5px',
        color:'#fff',
        fontWeight:'600'
    },
    '@media(max-width:400px)': {
        btnsContainer: {
            fontSize: '3.3vw',
            '& > *': {
                height: '7vw',
                cursor: 'auto'
            }
        },
        selecet: {
            fontSize: '3.3vw',
            padding: '0'
        }
    },

}

class BtnsContainer extends Component {

    render() {
        const { classes, action, title, refresh, showRooms } = this.props
        return (
            <div className={classes.btnsContainer}>
                <div onClick={refresh}>Refresh</div>
                {showRooms ? 
                    <select onChange={showRooms} className={classes.selecet}>
                        <option>All</option>
                        <option>Full</option>
                        <option>Available</option>
                    </select> : null }
                {title ? <div onClick={action}>{title}</div> : null}
            </div>
        );
    }
}

export default injectSheet(styles)(BtnsContainer);