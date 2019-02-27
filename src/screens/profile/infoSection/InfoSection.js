import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab';
import './InfoSection.css';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

//add the access token below
const ACCESS_TOKEN = "";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    gridListMedia:{
        flexWrap:"nowrap",
        transform:'translateZ(0)',
        width:'100%'
    }
};

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const TabContainer = function(props){
    return(
        <Typography component="div" style={{ padding: 0}}>
        {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class InfoSection extends Component {
    constructor() {
        super();
        this.state = {
            username:undefined,
            profile_picture:undefined,
            full_name:undefined,
            media:undefined,
            follows:undefined,
            followed_by:undefined,
            editModalIsOpen:false,
            editedFullName:"",
            editedFullNameRequired: "dispNone"
            
        }
    }
    getProfileData = async () => {


        const api_call_general = await fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${ACCESS_TOKEN}`
        );
        const profileData = await api_call_general.json();
        if (profileData) {
           
            this.setState({ username: profileData.data.username,
                profile_picture:profileData.data.profile_picture,
                full_name:profileData.data.full_name,
                media:profileData.data.counts.media,
                follows:profileData.data.counts.follows,
                followed_by:profileData.data.counts.followed_by
          
         });
          
        }

    }
 
    


    componentWillMount() {
        this.getProfileData();
    }
    
    openEditModalHandler=()=>{
        this.setState({editModalIsOpen:true});
    }
    closeEditModalHandler=()=>{
        this.setState({editModalIsOpen:false});
    }
    editedFullNameChangeHandler=(e)=>{
       this.setState({editedFullName:e.target.value});
    }
    editFullNameHandler=()=>{
        let editedName = this.state.editedFullName;
        editedName===""? this.setState({editedFullNameRequired:"dispBlock"}):this.setState({editedFullNameRequired:"dispNone",full_name: editedName, editedFullName:"",editModalIsOpen:false,});
    }
    render() {
      
   
        return (
            <div className="details">

                <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img className="profileImage" src={this.state.profile_picture} alt={this.state.username} />
                    </div>
                    <div className="rightDetails">
                        <div>
                            <Typography variant="h5" component="h5">{this.state.username} </Typography>
                        </div>
                        <br />
                        <div className="flex-countsContainer">
                        <div><Typography>  <span className="bold">Posts: </span> {this.state.media}</Typography></div>          
                            <div><Typography><span className="bold">&nbsp;&nbsp;&nbsp;&nbsp;Followed:</span> {this.state.follows} </Typography></div>     
                            <div><Typography><span className="bold"> &nbsp;&nbsp;&nbsp;&nbsp;Followed By:</span> {this.state.followed_by} </Typography></div>
                        </div>
                        <br/>
                        <div className="flex-editNameContainer">
                            <div className="fullNameContainer">
                            <Typography variant="subheading">{this.state.full_name}</Typography>
                            </div>
                            <div className="editButtonContainer">
                            <Fab color="secondary" onClick={this.openEditModalHandler} aria-label="Edit"><EditIcon/></Fab>               </div>
                        </div>
                    </div>

                </div>

                <Modal ariaHideApp={false} isOpen={this.state.editModalIsOpen} label="Edit"
                onRequestClose={this.closeEditModalHandler} style={customStyles}>
               
                        <Tab label="Edit" style={{fontStyle:"bold",fontSize:"1em",color:"#000000"}} className="editLabelHead">Edit</Tab>
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                                <Input id="fullName" type="text" editedFullName ={this.state.editedFullName} onChange={this.editedFullNameChangeHandler}/>
                                <FormHelperText className={this.state.editedFullNameRequired}>
                                <span className="red">required</span>
                                </FormHelperText>
                            </FormControl><br/>
                            <Button variant="contained" style={{backgroundColor: '#5B00BB',color:"#FFFFFF",marginTop:'10px'}} onClick={this.editFullNameHandler}>UPDATE</Button>
                        </TabContainer>            
                
                </Modal>


            </div>
        );


    }

}
export default withStyles(styles)(InfoSection);