function IntroScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
            title="Go to Sign up"
            onPress={() => navigation.navigate('Sign up')}
            />
        </View>
    );
}