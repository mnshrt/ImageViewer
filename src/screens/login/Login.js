import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Header from "./Header";

const CardContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign:'center' }}>
        {props.children}
        </Typography>
    );
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginIsClicked: false,
            value: 0
        };
    }
    loginButtonHandler = () => {
        this.setState({ loginIsClicked: true })

    }
    render(){
        return(
            <div>
                <div>
                 <Header></Header>
            </div>
                <CardContainer>
                    <CardContent>
                    <Typography variant="h5" component="h2">LOGIN</Typography>
                   
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type ="text"></Input>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type ="password"></Input>
                        </FormControl><br/><br/>
                        
                    
                <div className="login-button">
                        <Button variant="contained" colour="primary"
                            onClick={this.loginButtonHandler}>
                            Login
                        </Button>
                </div>
                </CardContent>
                </CardContainer>
            </div>
        );
    }

export default Login;