import React from 'react'
import injectSheet from 'react-jss'
import { confirmAlert } from 'react-confirm-alert'; // Import

const styles = {
  container: {
    backgroundColor: 'red',
    padding: '10px',
    textAlign: 'center',
    maxWidth: '300px',
    margin: 'auto',
    position: 'fixed',
    top:'40%',
    left:'40%'
  },
  containerBtns: {
    display: 'flex'
  },
  fixed: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(150,150,150,.6)'
  }
}

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleClickDelete = () => {

  }
  componentDidMount() {
  }

  x = (classes) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
          <div className={classes.fixed}></div>
          <div className={classes.container}>
            <p>we are gonna move to </p>
            <div>
              <button onClick={onClose}>No</button>
              <button onClick={() => {
                this.handleClickDelete()
                onClose()
              }}>Yes</button>
            </div>
          </div>
          </div>
        )
      }
    })
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'enter to some room?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };

  render() {
    const { classes } = this.props
    return (
      <div style={{display:this.props.isDisplay}}>
      </div>
    )
  }
}

export default injectSheet(styles)(Test)