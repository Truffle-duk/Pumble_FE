import React from 'react';

function Section({ children, title }) {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <div style={{ marginTop: '32px', padding: '0 24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                {title}
            </h2>
            <p style={{ marginTop: '8px', fontSize: '18px', fontWeight: '400', color: isDarkMode ? '#D3D3D3' : '#101010' }}>
                {children}
            </p>
        </div>
    );
}

function App() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
    };

    return (
        <div style={backgroundStyle}>
            <div style={{ backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}>
                <Section title="Step One">
                    Edit <span style={{ fontWeight: '700' }}>App.jsx</span> to change this screen and then come back to see your edits.
                </Section>
                <Section title="See Your Changes">
                    {/* ReloadInstructions를 웹용으로 대체하거나 설명 추가 */}
                </Section>
                <Section title="Debug">
                    {/* DebugInstructions를 웹용으로 대체하거나 설명 추가 */}
                </Section>
                <Section title="Learn More">
                    Read the docs to discover what to do next:
                </Section>
            </div>
        </div>
    );
}

export default App;
