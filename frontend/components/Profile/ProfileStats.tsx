import { COLORS, hp, wp } from "components/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ProfileStats = () => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>15</Text>
                <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Skills</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        paddingVertical: hp(2),
        borderRadius: wp(4),
        marginBottom: hp(3),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: COLORS.border,
    },
});
