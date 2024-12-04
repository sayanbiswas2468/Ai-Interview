import React from 'react';

const Loader: React.FC = () => {
    const styles: { [key: string]: React.CSSProperties } = {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor:'black',
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            zIndex: 100,
        },
        container: {
            position: 'relative',
            borderRadius: '50%',
            height: '96px',
            width: '96px',
            animation: 'rotate_3922 1.2s linear infinite',
            backgroundColor: '#c2410c',
            backgroundImage: 'linear-gradient(#ffffff, #000000, #ffffff)',
        },
        containerSpan: {
            position: 'absolute',
            borderRadius: '50%',
            height: '100%',
            width: '100%',
            backgroundColor: '#c2410c',
            backgroundImage: 'linear-gradient(#c2410c, #c2410c, #ffffff)',
        },
        spanBlur1: {
            filter: 'blur(5px)',
        },
        spanBlur2: {
            filter: 'blur(10px)',
        },
        spanBlur3: {
            filter: 'blur(25px)',
        },
        spanBlur4: {
            filter: 'blur(50px)',
        },
    };

    const keyframesStyle = `
        @keyframes rotate_3922 {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <span style={{ ...styles.containerSpan, ...styles.spanBlur1 }}></span>
                    <span style={{ ...styles.containerSpan, ...styles.spanBlur2 }}></span>
                    <span style={{ ...styles.containerSpan, ...styles.spanBlur3 }}></span>
                    <span style={{ ...styles.containerSpan, ...styles.spanBlur4 }}></span>
                </div>
            </div>
        </>
    );
};

export default Loader;
