export class DemoView extends Component {
    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={this.props.style}>
            {this.props.children}
            </View>
        );
    }
}