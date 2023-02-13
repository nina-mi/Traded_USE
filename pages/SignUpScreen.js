function SignUpScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
            title="Fill in your info."
            onPress={() => navigation.push('Details')}
            />
            {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        </View>
    );
  }