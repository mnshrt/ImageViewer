import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

//add the access token below
const ACCESS_TOKEN = "";


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
      height: 900,
    },
  });
class ImageGridListSection extends Component{

     constructor(props){
         super(props);
         this.state={
         imagePostsData:[]
        }
    }

    
    componentWillMount(){
        this.getMediaData();
    }
    getMediaData = async () => {
        const api_call_general= await fetch(
            'https://api.instagram.com/v1/users/self/media/recent?access_token='+ACCESS_TOKEN
            );
        const mediaData = await api_call_general.json();
        if(mediaData){
            this.setState({imagePostsData:mediaData.data});
            console.log(mediaData.data[0].images.standard_resolution.url);
        }
    }
    
   render(){ 
    let {classes}= this.props;
    let imagePostsData= this.state.imagePostsData;
       return(
        <div className={classes.root}>
        <GridList cellHeight={400} className={classes.gridList} cols={3}>
          {imagePostsData.map(post => (
            <GridListTile key={"grid"+post.id}>
              <img src={post.images.standard_resolution.url} alt={post.caption.text} />
            </GridListTile>
          ))}
        </GridList>

      </div>

    );

   }

}
export default withStyles(styles)(ImageGridListSection);