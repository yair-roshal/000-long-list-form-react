import { emailRegex } from '../constants/constants';
import validCountries from '../data/countries.json';

export const calculateErrorCounts = (usersData) => {
  let emptyFields = 0;
  let invalidFields = 0;
  let newErrorsArray = [];

  usersData.forEach((user) => {
    const newErrors = {};

    // Name validation
    if (!user.name || !/^[a-zA-Z\s]+$/.test(user.name)) {
      newErrors.name = true;
      if (!user.name) {
        emptyFields++;
      } else {
        invalidFields++;
      }
    } else {
      newErrors.name = false;
    }

    // Country validation
    if (!user.country || !validCountries.includes(user.country)) {
      newErrors.country = true;
      if (!user.country) {
        emptyFields++;
      } else {
        invalidFields++;
      }
    } else {
      newErrors.country = false;
    }

    // Email validation
    if (!user.email || !emailRegex.test(user.email)) {
      newErrors.email = true;
      if (!user.email) {
        emptyFields++;
      } else {
        invalidFields++;
      }
    } else {
      newErrors.email = false;
    }

    // Phone validation
    if (!user.phone || !user.phone.startsWith('+')) {
      newErrors.phone = true;
      if (!user.phone) {
        emptyFields++;
      } else {
        invalidFields++;
      }
    } else {
      newErrors.phone = false;
    }

    // Check if all values in newErrors are true
    const allErrorsTrue = Object.values(newErrors).every((error) => error === true);

    // If all values are true, set them to false
    if (allErrorsTrue) {
      for (const key in newErrors) {
        newErrors[key] = false;
      }
    }

    // Update the errors for the user
    newErrorsArray[user.id] = newErrors;
  });

  return { emptyFields, invalidFields, newErrorsArray };
};
