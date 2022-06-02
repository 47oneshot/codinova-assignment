import * as React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';

import {
  colors,
  screen_height,
  screen_width,
  size,
  uid,
} from '../constant/theme';
import {addEmployee} from '../store/userSlice';
import {useValidation} from '../hooks/useValidation';

const EmployeeFormScreen = ({navigation, route}) => {
  const formSchemes = useValidation([
    'firstName',
    'lastName',
    'email',
    'jobTitle',
    'salary',
  ]);

  const navigateToDataList = props => navigation.navigate('EmployeeList');
  const dispatch = useDispatch();
  const employee = useSelector(state => state.user);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    salary: '',
  };

  const handleSave = (params,resetForm) => {
    const {firstName, lastName, email, jobTitle, salary} = params;
    dispatch(
      addEmployee({
        id: uid(),
        firstName,
        lastName,
        email,
        jobTitle,
        salary,
        fav: false,
      }),
    );
    employee?.length && navigateToDataList();
    resetForm({values: initialValues})
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor={colors.white}
        translucent
        barStyle="dark-content"
        animated
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.root}>
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>Enter employee details</Text>
            <Formik
              validationSchema={formSchemes}
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={(values, {resetForm}) => handleSave(values, resetForm)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      style={styles.textInputLabel}
                      activeUnderlineColor={colors.primary}
                    />
                    {errors.firstName && touched.firstName && (
                      <Text style={styles.error}>{errors.firstName}</Text>
                    )}
                    <TextInput
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      style={styles.textInputLabel}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      activeUnderlineColor={colors.primary}
                    />
                    {errors.lastName && touched.lastName && (
                      <Text style={styles.error}>{errors.lastName}</Text>
                    )}
                    <TextInput
                      name="email"
                      label="Email"
                      value={values.email}
                      style={styles.textInputLabel}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      activeUnderlineColor={colors.primary}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <TextInput
                      name="jobTitle"
                      label="Job Title"
                      value={values.jobTitle}
                      style={styles.textInputLabel}
                      onChangeText={handleChange('jobTitle')}
                      onBlur={handleBlur('jobTitle')}
                      activeUnderlineColor={colors.primary}
                    />
                    {errors.jobTitle && touched.jobTitle && (
                      <Text style={styles.error}>{errors.jobTitle}</Text>
                    )}
                    <TextInput
                      name="salary"
                      label="Salary"
                      value={values.salary}
                      style={styles.textInputLabel}
                      onChangeText={handleChange('salary')}
                      onBlur={handleBlur('salary')}
                      keyboardType="number-pad"
                      activeUnderlineColor={colors.primary}
                    />
                    {errors.salary && touched.salary && (
                      <Text style={styles.error}>{errors.salary}</Text>
                    )}
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                      style={styles.button}>
                      <Text style={styles.textButton}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmployeeFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingVertical: screen_height(5),
  },
  inputContainer: {
    paddingHorizontal: size.appSpacing,
  },
  heading: {
    fontSize: size.textFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    paddingVertical: size.appSpacing,
  },
  textInputLabel: {
    marginVertical: size.appSpacing / 2,
    backgroundColor: colors.white,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: size.verticalSpacing,
    height: 50,
    width: screen_width(100) - 2 * size.appSpacing,
    backgroundColor: colors.primary,
  },
  textButton: {
    fontSize: size.smallTextFontSize,
    fontWeight: 'bold',
    color: colors.white,
  },
  error: {color: colors.danger, fontSize: size.tooSmallTextFontSize},
});
