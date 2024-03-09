import React, { useState } from "react";
import RegistrationForm from "./RegistartionForm";
import PreferenceSelection from "./PreferenceSelection";

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = useState(null);
    const [preferenceData, setPreferenceData] = useState(null);

    const handleRegistrationSubmit = (data) => {
        setRegistrationData(data);
    };

    const handlePreferenceSubmit = (data) => {
        setPreferenceData(data);
    };

    return (
        <div>
            {!registrationData && <RegistrationForm onSubmit={handleRegistrationSubmit} />}
            {registrationData && (
                <div>
                    <PreferenceSelection onSubmit={handlePreferenceSubmit} />
                </div>
            )}
            {preferenceData && (
                <div>
                    <h2>Registration Data:</h2>
                    <pre>{JSON.stringify(registrationData, null, 2)}</pre>
                    <h2>Preference Data:</h2>
                    <pre>{JSON.stringify(preferenceData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
