import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import RelationsSearch from "../../components/relations/RelationsSearch";
import RelationItem from "../../components/relations/RelationItem";
import PendingRelationItem from "../../components/relations/PendingRelationItem";
import RelationsTabs, {
  TabType,
} from "../../components/relations/RelationsTabs";
import FloatingActionButton from "../../components/relations/FloatingActionButton";
import AddRelationModal from "../../components/relations/AddRelationModal";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import EmptySection from "../../components/relations/EmptySection";
import { UserInfo } from "../../types/api/Users";
import * as relationsAPI from "../../api/relationsAPI";
import * as usersAPI from "../../api/usersAPI";
import { useRelations } from "../../contexts/RelationsContext";
import ErrorMessage from "../../components/relations/ErrorMessage";
import { useTokens } from "../../contexts/TokensContext";

export default function Relations() {
  const { accessToken } = useTokens();
  const { relations, loading, error, refreshRelations } = useRelations();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("associated");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Categorize relations
  const associatedRelations = relations.filter((r) => r.type === "relation");
  const pendingIncoming = relations.filter((r) => r.type === "incoming");
  const pendingOutgoing = relations.filter((r) => r.type === "outgoing");

  // Accept incoming relation
  const handleAcceptRelation = async (id: number) => {
    try {
      setErrorMessage("");
      await relationsAPI.changeRelationRequestStatus(
        "accepted",
        id,
        accessToken
      );
      await refreshRelations();
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Failed to accept relation. Please try again later."
      );
    }
  };

  // Reject incoming relation
  const handleRejectRelation = async (id: number) => {
    try {
      setErrorMessage("");
      await relationsAPI.changeRelationRequestStatus(
        "rejected",
        id,
        accessToken
      );
      await refreshRelations();
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Failed to reject relation. Please try again later."
      );
    }
  };

  // Cancel outgoing relation
  const handleCancelRequest = async (id: number) => {
    try {
      setErrorMessage("");
      await relationsAPI.changeRelationRequestStatus(
        "canceled",
        id,
        accessToken
      );
      await refreshRelations();
    } catch (error: any) {
      setErrorMessage(
        error?.message ||
          "Failed to cancel relation request. Please try again later."
      );
    }
  };

  // Filtering helpers
  const filterByQuery = (user: UserInfo | { id: number }) => {
    const name = (user as UserInfo).fullName || String(user.id);
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(user.id).includes(searchQuery)
    );
  };

  const filteredAssociated = associatedRelations.filter((rel) =>
    filterByQuery(rel.user)
  );
  const filteredPending = {
    incoming: pendingIncoming.filter((rel) => filterByQuery(rel.user)),
    outgoing: pendingOutgoing.filter((rel) => filterByQuery(rel.user)),
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "associated":
        return filteredAssociated.length > 0 ? (
          filteredAssociated.map((relation) => (
            <RelationItem
              key={relation.id}
              user={relation.user as UserInfo}
              relationType={relation.type}
              relationId={relation.id}
              onDelete={refreshRelations}
            />
          ))
        ) : (
          <EmptySection
            message="You don't have any associated relations yet. Add a new relation to get started!"
            icon="people-outline"
          />
        );
      case "incoming":
        return filteredPending.incoming.length > 0 ? (
          filteredPending.incoming.map((relation) => (
            <PendingRelationItem
              key={relation.id}
              name={
                (relation.user as UserInfo).fullName || String(relation.user.id)
              }
              id={String(relation.user.id)}
              type="incoming"
              onAccept={() => handleAcceptRelation(relation.id)}
              onReject={() => handleRejectRelation(relation.id)}
            />
          ))
        ) : (
          <EmptySection
            message="No incoming relation requests at the moment"
            icon="call-received"
          />
        );
      case "outgoing":
        return filteredPending.outgoing.length > 0 ? (
          filteredPending.outgoing.map((relation) => (
            <PendingRelationItem
              key={relation.id}
              name={"Unknown_ID" + relation.user.id}
              id={String(relation.user.id)}
              type="outgoing"
              onCancel={() => handleCancelRequest(relation.id)}
            />
          ))
        ) : (
          <EmptySection
            message="No outgoing relation requests at the moment"
            icon="call-made"
          />
        );
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case "associated":
        return "Associated Relations";
      case "incoming":
        return "Incoming Requests";
      case "outgoing":
        return "Outgoing Requests";
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading relations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Relations"
        icon={<FontAwesome name="users" size={24} color={Colors.primary} />}
        rightComponent={
          <Pressable
            onPress={refreshRelations}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
            accessibilityLabel="Refresh relations"
          >
            {loading ? (
              <FontAwesome name="spinner" size={22} color={Colors.primary} style={{ marginLeft: 3 }} />
            ) : (
              <FontAwesome name="refresh" size={22} color={Colors.primary} style={{ marginLeft: 3 }} />
            )}
          </Pressable>
        }
      />
      <ErrorMessage message={errorMessage || error || ""} />
      <RelationsSearch value={searchQuery} onSearch={setSearchQuery} />
      <RelationsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          associated: filteredAssociated.length,
          incoming: filteredPending.incoming.length,
          outgoing: filteredPending.outgoing.length,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{getSectionTitle()}</Text>
          {renderTabContent()}
        </View>
      </ScrollView>

      <FloatingActionButton onPress={() => setIsModalVisible(true)} />
      <AddRelationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={async (id, setStatus) => {
          if (associatedRelations.some((r) => r.user.id == +id)) {
            setStatus &&
              setStatus({
                type: "error",
                message: "This relation already exists",
              });
            return;
          }
          try {
            await usersAPI.postRelationRequest(+id, accessToken);
            setStatus &&
              setStatus({
                type: "success",
                message: "Relation request sent successfully",
              });
            // Wait 1s before closing and refreshing, so user sees the success message
            setTimeout(async () => {
              setIsModalVisible(false);
              await refreshRelations(); // from context
            }, 1000);
          } catch (err) {
            setStatus &&
              setStatus({
                type: "error",
                message: "Failed to send relation request",
              });
            return;
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    minHeight: 200,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
