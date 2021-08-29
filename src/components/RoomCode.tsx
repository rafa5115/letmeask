
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import '../styles/room-code.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tool: {
        background: '#f8f8f8',
        boxShadow: 'none',
        color: 'black'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        border: 'none',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        padding: '0px 16px',
        position: 'absolute',
        background: '#835afd',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: '8px',
        borderTopLeftRadius: '8px',
        color: '#fff',
        zIndex: 1,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        border: 'solid 1px #8f8989',
        borderRadius: '8px',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
type RoomCodeProps ={
    code: string;
}
export function RoomCode(props: RoomCodeProps) {
    const classes = useStyles();

function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
}
    return (

        <div className={classes.search}>

            <button onClick={copyRoomCodeToClipboard} className={classes.searchIcon}><SearchIcon /></button>


            <InputBase
                placeholder="procurar sala"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>

    )
}