import React, {useState, useReducer, useCallback, useEffect} from 'react';
import {StyleSheet, ScrollView, View, KeyboardAvoidingView, Button, Platform, Alert} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Loading from '../../components/UI/Loading';
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'UPDATE';
const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updateValues = {...state.inputValues, [action.input]: action.value};
        const updatedValidities = {...state.inputValues, [action.input]: action.isValid};
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {formIsValid: updatedFormIsValid, inputValues: updateValues, inputValidities: updatedValidities};
    }

    return state;
};

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [formState, dispatch] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });
    const {email, password} = formState.inputValues;

    const inputChangeHandler = useCallback((inputIdentifier, value, isValid) => {
        dispatch({type: FORM_INPUT_UPDATE, value, isValid, input: inputIdentifier});
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            Alert.alert('An Error Occured', isError, [{text: 'Okey'}]);
        }
    }, [isError]);

    const authHandler = useCallback(async () => {
        setIsLoading(true);
        setIsError(null);
        try {
            if (isSignUp) {
                await props.signUpDispatch(email, password);
            } else {
                await props.logInDispatch(email, password);
            }
            props.navigation.navigate('Shop');
        } catch (e) {
            setIsError(e.message);
            setIsLoading(false);
        }
    }, [email, password, isSignUp]);

    return <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Card style={styles.container}>
                <ScrollView>
                    <Input
                        keyboardType={'email-address'}
                        id={'email'}
                        label={'E-Mail'}
                        required
                        email
                        autoCapitilaze={'none'}
                        errorText={'Please enter a valid email'}
                        onInputChange={inputChangeHandler}
                        initialValue={''}
                    />
                    <Input
                        id={'password'}
                        label={'Password'}
                        keyboardType={'default'}
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitilaze={'none'}
                        errorText={'Please enter a valid password'}
                        onInputChange={inputChangeHandler}
                        initialValue={''}
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading ? <Loading/> : <Button title={isSignUp ? 'Sign Up' : 'Login'} color={Colors.primary}
                                                          onPress={authHandler}/>}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Switch ${isSignUp ? 'Login' : 'Sign Up'}`}
                            color={Colors.accent}
                            onPress={() => setIsSignUp(prevState => !prevState)}
                        />
                    </View>

                </ScrollView>
            </Card>
        </LinearGradient>
    </KeyboardAvoidingView>

};
AuthScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Authenticate',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,

    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
    }
});


const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signUpDispatch: (email, password) => dispatch(authActions.signup(email, password)),
        logInDispatch: (email, password) => dispatch(authActions.logIn(email, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);