import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';

export default function DigitalToolsScreen({ navigation }: any) {
    const [activeTool, setActiveTool] = useState<'pxconverter' | 'datacalc' | 'snippets'>('pxconverter');

    // Pixel Converter State
    const [pixels, setPixels] = useState('');
    const [rem, setRem] = useState<string>('');

    const convertPxToRem = () => {
        const val = parseFloat(pixels);
        if (!isNaN(val)) {
            setRem(`${(val / 16).toFixed(3)} rem`);
        }
    };

    // Data Calculator State
    const [gbValue, setGbValue] = useState('');
    const [mbValue, setMbValue] = useState<string>('');

    const convertGbToMb = () => {
        const val = parseFloat(gbValue);
        if (!isNaN(val)) {
            setMbValue(`${(val * 1024).toFixed(0)} MB`);
        }
    };

    const ToolTab = ({ id, label, icon }: any) => (
        <TouchableOpacity
            style={[styles.tab, activeTool === id && styles.activeTab]}
            onPress={() => setActiveTool(id)}
        >
            <MaterialIcons name={icon} size={24} color={activeTool === id ? COLORS.onPrimary : COLORS.textSecondary} />
            <Text style={[styles.tabText, activeTool === id && styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Digital Tools</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabBar}>
                <ToolTab id="pxconverter" label="Px to Rem" icon="transform" />
                <ToolTab id="datacalc" label="Data Calc" icon="storage" />
                <ToolTab id="snippets" label="Snippets" icon="code" />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {activeTool === 'pxconverter' && (
                    <View style={styles.toolContainer}>
                        <Text style={styles.toolTitle}>Pixel to Rem Converter</Text>
                        <Text style={styles.toolDesc}>Convert pixels to rem units (base 16px).</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Pixels (px)</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={pixels}
                                onChangeText={setPixels}
                                placeholder="16"
                            />
                        </View>

                        <TouchableOpacity style={styles.actionButton} onPress={convertPxToRem}>
                            <Text style={styles.actionButtonText}>Convert</Text>
                        </TouchableOpacity>

                        {rem !== '' && (
                            <View style={styles.resultBox}>
                                <Text style={styles.resultLabel}>Result</Text>
                                <Text style={styles.resultValue}>{rem}</Text>
                            </View>
                        )}
                    </View>
                )}

                {activeTool === 'datacalc' && (
                    <View style={styles.toolContainer}>
                        <Text style={styles.toolTitle}>Data Converter</Text>
                        <Text style={styles.toolDesc}>Convert GB to MB for server sizing.</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gigabytes (GB)</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={gbValue}
                                onChangeText={setGbValue}
                                placeholder="1"
                            />
                        </View>

                        <TouchableOpacity style={styles.actionButton} onPress={convertGbToMb}>
                            <Text style={styles.actionButtonText}>Convert to MB</Text>
                        </TouchableOpacity>

                        {mbValue !== '' && (
                            <View style={styles.resultBox}>
                                <Text style={styles.resultLabel}>Result</Text>
                                <Text style={styles.resultValue}>{mbValue}</Text>
                            </View>
                        )}
                    </View>
                )}

                {activeTool === 'snippets' && (
                    <View>
                        <Text style={styles.sectionTitle}>Saved Snippets</Text>

                        {['React Component', 'API Fetch', 'Flexbox Center'].map((item, index) => (
                            <TouchableOpacity key={index} style={styles.blueprintCard}>
                                <View style={styles.blueprintIcon}>
                                    <MaterialIcons name="code" size={32} color={COLORS.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.bpTitle}>{item}</Text>
                                    <Text style={styles.bpDate}>Last edited: 2 days ago</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.addBpButton}>
                            <MaterialIcons name="add" size={24} color={COLORS.primary} />
                            <Text style={styles.addBpText}>Add New Snippet</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: COLORS.primary,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.onPrimary,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        padding: 4,
        margin: wp(4),
        borderRadius: 12,
        elevation: 2,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        marginLeft: 4,
        fontWeight: '600',
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    activeTabText: {
        color: COLORS.onPrimary,
    },
    content: {
        paddingHorizontal: wp(4),
        paddingBottom: hp(5),
    },
    toolContainer: {
        backgroundColor: COLORS.surface,
        padding: wp(5),
        borderRadius: 16,
        elevation: 1,
    },
    toolTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    toolDesc: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: hp(3),
    },
    inputGroup: {
        marginBottom: hp(2),
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: COLORS.textPrimary,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: COLORS.textPrimary,
        backgroundColor: '#FCFCFC',
    },
    actionButton: {
        backgroundColor: COLORS.secondary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: hp(3),
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    resultBox: {
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    resultLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    resultValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginVertical: 4,
    },
    resultSub: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    blueprintCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
    },
    blueprintIcon: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.primary + '15',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    bpTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    bpDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        color: COLORS.textPrimary,
    },
    addBpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: 12,
        marginTop: 8,
    },
    addBpText: {
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: 8,
    }
});
