const styles = {
    // Background and overlay
    pageBackground: {
        background: 'var(--Background-Utilities-Scrim, rgba(255, 255, 255, 0.80))'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // New wrapper for both containers
    containerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        width: '970px',
        height: '700px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        opacity: 0,
        transform: 'scale(0.8)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
    },
    containerVisible: {
        opacity: 1,
        transform: 'scale(1)'
    },

    // Left side: Secondary Container
    secondaryContainer: {
        width: '40%',
        height: '94.2%',
        backgroundColor: '#1e4171',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
    },
    sideHeading: {
        fontSize: '32px',
        fontWeight: '700',
    },
    sideText: {
        fontSize: '16px',
        marginTop: '10px',
    },

    // Right side: Login form
    container: {
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
    },
    
    heading: {
        color: 'black',
        fontSize: '48px',
        fontFamily: 'Inter',
        fontWeight: '700',
        wordWrap: 'break-word',
        marginBottom: '20px',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    },
    
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        color: '#333333',
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: '16px',
        width: '95%',
    },
    
    button: {
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
    },
    
    registerButton: {
        backgroundColor: "#345484",
        color: "#ffffff",
        padding: "8px",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
    },

    divider: {
        width: '100%',
        border: 'none',
        borderTop: '1px solid gray', // Light gray line
        margin: '15px 0', // Space around the line
    },

    rememberForgotContainer: {
        display: 'flex',
        justifyContent: 'space-between', // Pushes items to the edges
        alignItems: 'center', // Aligns them vertically
        width: '100%', // Ensures it spans full width
        marginBottom: '15px',
    },

    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },

    checkbox: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
    },

    checkboxLabel: {
        fontSize: '14px',
        color: '#333',
        cursor: 'pointer',
    },

    forgotPasswordLink: {
        color: '#1976d2',
        fontSize: '14px',
        textDecoration: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
    },

    socialLoginContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '.5px',
    },

    socialCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0', // Light gray background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background 0.3s',
    },

    socialCircleHover: {
        backgroundColor: '#e0e0e0',
    },

    socialIcon: {
        width: '25px', 
        height: '25px',
    },

    signUpContainer: {
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '14px',
    },

    signUpLink: {
        color: '#007bff', // Blue color
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
        cursor: 'pointer',
    },
    
    // Sign Out Button
    loginButton: {
        backgroundColor: "#1e4171",
        color: "#ffffff",
        padding: "9px",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    profilePicContainer: {
        display: "flex", // Ensure it's flexbox
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
        flexDirection: "column", // Stack elements
        width: "100%", // Ensure it takes full width
        marginBottom: "5px",
    },
    profilePicLabel: {
        cursor: "pointer",
        display: "block",
    },
    profilePicCircle: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "2px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        margin: "auto", // Center within a block container
    },
    profilePic: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    profilePicPlaceholder: {
        fontSize: "32px",
        color: "#888",
    },
    
    // Dashboard Styles
    dash_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '800px',
        width: '90%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },

    tableWrapper: {
        overflowX: 'auto',
        marginBottom: '20px',
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        backgroundColor: 'white',
    },

    tableHeader: {
        backgroundColor: '#4970b3',
        color: '#ffffff',
        padding: '12px 20px',
        textAlign: 'left',
        fontWeight: '500',
    },

    tableCell: {
        padding: '12px 20px',
        borderBottom: '1px solid #e0e0e0',
        color: '#333333',
    },
};

export default styles;
