// --- SUB-COMPONENTS ---
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { COLORS, wp, hp } from "./utils";
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../src/navigation/ProfileNavigator";
import { RootStackParamList } from "App";

// 3. Quick Action Menu (Bottom Sheet Content)
export const QuickActionMenuWidget = ({ onClose }: { onClose: () => void }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (screen: keyof RootStackParamList) => {
    onClose();
    // Small delay to allow modal to close smoothly before navigating
    setTimeout(() => {
      navigation.navigate(screen);
    }, 300);
  };

  const ActionTile = ({ title, subtitle, icon, color, screen }: any) => (
    <TouchableOpacity
      style={[styles.actionTile, { borderColor: color + '4D' }]}
      onPress={() => handlePress(screen)}
    >
      <View style={[styles.actionIconBox, { backgroundColor: color + '1A' }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.bottomSheetHandle} />
      <Text style={styles.bottomSheetTitle}>Quick Actions</Text>
      <ActionTile
        title="My Portfolio"
        subtitle="My Portfolio data"
        icon="edit-note"
        color={COLORS.primary}
        screen="MyPortfolio"
      />
    </View>
  );
};

// 4. Farm Summary Card (Swipeable)
export const FarmSummaryCardWidget = ({ data, onTap, onToggleChanged, onLongPress }: any) => {
  const renderRightActions = () => {
    return (
      <View style={styles.swipeActionsContainer}>
        <TouchableOpacity style={[styles.swipeAction, { backgroundColor: COLORS.secondary }]}>
          <MaterialIcons name="share" size={24} color="white" />
          <Text style={styles.swipeActionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.swipeAction, { backgroundColor: COLORS.tertiary }]}>
          <MaterialIcons name="bookmark" size={24} color="black" />
          <Text style={[styles.swipeActionText, { color: 'black' }]}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[styles.cardContainer, { borderColor: data.statusColor + '4D' }]} // 4D = 30% opacity hex
        onPress={onTap}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.cardIconBox, { backgroundColor: data.statusColor + '1A' }]}>
            <MaterialIcons name={data.icon} size={24} color={data.statusColor} />
          </View>

          <View style={styles.cardHeaderTextContainer}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle}>{data.title}</Text>
              {data.hasBadge && (
                <View style={[styles.badge, { backgroundColor: data.statusColor }]}>
                  <Text style={styles.badgeText}>{data.badgeCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardValue}>{data.value}</Text>
          </View>

          {data.hasToggle ? (
            <Switch
              value={data.toggleValue}
              onValueChange={onToggleChanged}
              trackColor={{ false: '#767577', true: COLORS.primary + '80' }} // +80 for opacity
              thumbColor={data.toggleValue ? COLORS.primary : '#f4f3f4'}
            />
          ) : (
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
          )}
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardSubtitle}>{data.subtitle}</Text>
          <Text style={styles.cardDetails}>{data.details}</Text>
        </View>

        <TouchableOpacity style={styles.cardActionBtn} onPress={onTap}>
          <Text style={[styles.cardActionLabel, { color: COLORS.primary }]}>{data.actionLabel}</Text>
          <MaterialIcons name="arrow-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({

  // Swipe Actions
  swipeActionsContainer: {
    flexDirection: 'row',
    marginBottom: hp(2),
    paddingLeft: 8,
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: wp(3),
    marginLeft: 8,
  },
  swipeActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },

  // Farm Summary Card
  cardContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: wp(3),
    borderWidth: 1.5,
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIconBox: {
    padding: wp(2),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  cardHeaderTextContainer: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  badge: {
    marginLeft: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  cardValue: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  cardBody: {
    marginTop: hp(2),
    backgroundColor: '#F5F5F580', // Transparent grey
    padding: wp(2),
    borderRadius: wp(2),
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  cardDetails: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  cardActionBtn: {
    marginTop: hp(1),
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  cardActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  // Bottom Sheet
  bottomSheetContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    padding: wp(4),
    paddingBottom: hp(5),
  },
  bottomSheetHandle: {
    width: wp(12),
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  actionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    marginBottom: hp(2),
    borderRadius: wp(2),
    borderWidth: 1,
  },
  actionIconBox: {
    padding: wp(2),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cancelButton: {
    marginTop: hp(1),
    paddingVertical: 16,
    borderRadius: wp(3),
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  }
});