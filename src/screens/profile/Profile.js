import React, {Component} from 'react';
import InfoSection from './infoSection/InfoSection'
import ImageGridListSection from './imageGridListSection/ImageGridListSection';
class Profile extends Component{

    render(){
        return( 
        <div>
               {/*<Header/> */} 
               <InfoSection/>
               <ImageGridListSection/>
               {/*  **/}


        </div>);
         
        }
        
    
    
}
export default Profile;