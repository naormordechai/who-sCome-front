// // import React from 'react'
// // import injectSheet from 'react-jss'
// // import StorageService from '../../services/StorageService'

// // const styles = {
// //     container: {
// //         padding: '0 20px',
// //     },
// //     containerList: {
// //         maxWidth: '400px',
// //         borderRadius: '5px',
// //         margin: '0 auto',
// //         backgroundColor: 'rgb(26,33,37)',
// //         height: 'calc(100vh - 300px)',
// //         overflowY: 'scroll',
// //         padding: '0 5px',
// //         '&::-webkit-scrollbar': {
// //             width: '10px',
// //         },
// //         '&::-webkit-scrollbar-track': {
// //             borderRadius: '5px',
// //             background: '#000'
// //         },
// //         '&::-webkit-scrollbar-thumb': {
// //             borderRadius: '5px',
// //             background: '#888'
// //         },
// //         '&::-webkit-scrollbar-thumb:hover': {
// //             background: '#555'
// //         }
// //     },

// //     inputSearch: {
// //         borderRadius: '1000px',
// //         outline: 'none',
// //         border: 'none',
// //         padding: '4px 0px',
// //         transition: '.3s',
// //         textAlign: 'center',
// //         '&:focus': {
// //             padding: '4px 3px'
// //         }
// //     },
// //     header: {
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         borderBottom: '5px solid rgb(172,50,51)',
// //         marginBottom: '25px'
// //     },
// //     subHeader: {
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         margin: '0 8px',
// //         padding: '10px 0',
// //         color: '#fff',
// //         textDecoration: 'none',
// //         borderBottom: '2px solid #000',
// //     },
// // }


// // const roomDetails = ({ classes, match, history }) => {
// //     if (!StorageService.load(match.params.id)) {
// //         history.replace(`/enter password/${match.params.id}`)
// //     }

// //     return (
// //         <div className={classes.container}>
// //             <div className={classes.containerList}>
// //                 <ul>
// //                     <li>asdas</li>
// //                     <li>asdas</li>
// //                     <li>asdas</li>
// //                     <li>asdas</li>
// //                     <li>asdas</li>
// //                 </ul>
// //                 {/* {rooms.map(room => (
// //                     <RoomPreview key={room._id} room={room} subHeader={classes.subHeader} history={history} />
// //                 ))} */}
// //             </div>
// //         </div>
// //     )
// // }

// // export default injectSheet(styles)(roomDetails)









// import React from 'react'
// import injectSheet from 'react-jss'
// import RoomService from '../../services/RoomService'
// import BtnsContainer from '../../components/BtnsContainer/BtnsContainer'
// import uniqid from 'uniqid'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import moment from 'moment'
// import * as actionCreators from '../../store/actions/index'
// import StorageService from '../../services/StorageService'
// import InputComponent from '../../components/InputComponent/InputComponent'

// const styles = {
//     containerDetails: {
//         padding: '6px',
//         backgroundColor: 'rgb(26,33,37)',
//         borderRadius: '5px',
//     },
//     container: {
//         padding: '5px 20px',
//         maxWidth: '400px',
//         margin: '0 auto'
//     },
//     title: {
//         color: '#fff',
//         fontSize: '20px',
//         textAlign: 'center',
//         borderBottom: '3px solid #000',
//         fontWeight: '500',
//         marginBottom: '5px'
//     },
//     containerList: {
//         height: 'calc(100vh - 300px)',
//         overflowY: 'scroll',
//         padding: '0 5px',
//         '&::-webkit-scrollbar': {
//             width: '10px',
//         },
//         '&::-webkit-scrollbar-track': {
//             borderRadius: '5px',
//             background: '#000'
//         },
//         '&::-webkit-scrollbar-thumb': {
//             borderRadius: '5px',
//             background: '#888'
//         },
//         '&::-webkit-scrollbar-thumb:hover': {
//             background: '#555'
//         }
//     },

//     inputSearch: {
//         borderRadius: '1000px',
//         outline: 'none',
//         border: 'none',
//         padding: '4px 0px',
//         transition: '.3s',
//         textAlign: 'center',
//         '&:focus': {
//             padding: '4px 3px'
//         }
//     },
//     header: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         borderBottom: '5px solid rgb(172,50,51)',
//         marginBottom: '10px'
//     },
//     subHeader: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         margin: '5px 9px 0',
//         padding: '10px 0',
//         color: '#fff',
//         textDecoration: 'none',
//         borderBottom: '2px solid #000',
//     },
//     containerPerson: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         borderBottom: '2px solid #000',
//         fontSize: '18px',
//         '& > *': {
//             padding: '5px 0'
//         },
//         '& div:last-child': {
//             fontSize: '13px'
//         }
//     }
// }

// class RoomDetails extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             room: {
//                 persons: [],
//             },
//             person: {
//                 name: '',
//                 addedAt: 0
//             }
//         }
//     }

//     componentDidMount() {
//         if (!StorageService.load(this.props.match.params.id)) {
//             this.props.history.replace(`/enter password/${this.props.match.params.id}`)
//             return
//         }
//         RoomService.getById(this.props.match.params.id)
//             .then(({ data }) => {
//                 this.setState({
//                     ...this.state,
//                     room: data
//                 })
//             })
//     }

//     hanlderRefresh = () => {
//         window.location.reload()
//     }

//     handlerBack = () => {
//         this.props.history.push('/')
//     }

//     addPerson = () => {
//         console.log(this.state);

//     }

//     updatePerson = (e) => {
//         this.setState({
//             ...this.state,
//             person: {
//                 name: e.target.value,
//                 addedAt: this.state.person.addedAt
//             }
//         })
//     }

//     render() {
//         console.log(this.state.person);

//         const { classes } = this.props
//         const { room } = this.state
//         return (
//             <div className={classes.container}>
//                 <InputComponent
//                     width="100%"
//                     placeholder="add you to the list..."
//                     okBtn={true}
//                     onClickProps={this.addPerson}
//                     onChangeProps={this.updatePerson}
//                     textValidation={!!!this.state.person.name.length}
//                 />
//                 <BtnsContainer
//                     refresh={this.hanlderRefresh}
//                     title="Back To Home"
//                     action={this.handlerBack} />
//                 <div className={classes.containerDetails}>
//                     <div className={classes.title}>{room.roomName}</div>
//                     <div className={classes.header}>
//                         <div>Person List</div>
//                         <div>{room.persons.length}/{room.maxPlayers}</div>
//                     </div>
//                     <div className={classes.subHeader}>
//                         <div>Name</div>
//                         <div>Added At</div>
//                     </div>
//                     <div className={classes.containerList}>
//                         {room.persons.map((person, idx) => (
//                             <div className={classes.containerPerson} key={uniqid()}>
//                                 <div>{person.name}</div>
//                                 <div>{moment(person.addedAt).fromNow()}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToDispatch = dispatch => {
//     return {
//         onAddPerson: (room) => dispatch(actionCreators.updateRoom(room))
//     }
// }

// export default compose(connect(null, mapStateToDispatch), injectSheet(styles))(RoomDetails)


import React from 'react'

const roomDetails = (props) => (
        <div>
            roomDetails
            <button onClick={() => window.location.reload()}>refresh</button>
        </div>
)

export default roomDetails