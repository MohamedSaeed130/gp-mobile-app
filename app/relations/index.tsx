import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import RelationsSearch from "../../components/relations/RelationsSearch";
import RelationItem from "../../components/relations/RelationItem";
import PendingRelationItem from "../../components/relations/PendingRelationItem";
import RelationsTabs, { TabType } from "../../components/relations/RelationsTabs";
import FloatingActionButton from "../../components/relations/FloatingActionButton";
import AddRelationModal from "../../components/relations/AddRelationModal";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import EmptySection from '../../components/relations/EmptySection';

// Updated mock data with request types
const mockPendingRelations = [
  { id: "2468", name: "Alice Brown", type: "incoming" as const },
  { id: "1357", name: "Bob Wilson", type: "incoming" as const },
  { id: "3579", name: "Carol White", type: "outgoing" as const },
];

const mockAssociatedRelations = [
  { id: "1234", name: "John Doe", status: "associated" },
  { id: "5678", name: "Jane Smith", status: "associated" },
  { id: "9012", name: "Mike Johnson", status: "associated" },
];

export default function Relations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("associated");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingRelations, setPendingRelations] =
    useState(mockPendingRelations);
  const [associatedRelations, setAssociatedRelations] = useState(
    mockAssociatedRelations
  );

  const handleAcceptRelation = (id: string) => {
    const acceptedRelation = pendingRelations.find((r) => r.id === id);
    if (acceptedRelation) {
      setPendingRelations((prev) => prev.filter((r) => r.id !== id));
      setAssociatedRelations((prev) => [
        ...prev,
        { ...acceptedRelation, status: "associated" },
      ]);
    }
  };

  const handleRejectRelation = (id: string) => {
    setPendingRelations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancelRequest = (id: string) => {
    setPendingRelations(prev => prev.filter(r => r.id !== id));
  };

  const filteredPending = {
    incoming: pendingRelations
      .filter(r => r.type === 'incoming')
      .filter(relation =>
        relation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        relation.id.includes(searchQuery)
      ),
    outgoing: pendingRelations
      .filter(r => r.type === 'outgoing')
      .filter(relation =>
        relation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        relation.id.includes(searchQuery)
      ),
  };

  const filteredAssociated = associatedRelations.filter(
    (relation) =>
      relation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      relation.id.includes(searchQuery)
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'associated':
        return filteredAssociated.length > 0 ? (
          filteredAssociated.map((relation) => (
            <RelationItem
              key={relation.id}
              name={relation.name}
              id={relation.id}
              onPress={() => {
                console.log("Pressed relation:", relation);
              }}
            />
          ))
        ) : (
          <EmptySection
            message="You don't have any associated relations yet. Add a new relation to get started!"
            icon="people-outline"
          />
        );

      case 'incoming':
        return filteredPending.incoming.length > 0 ? (
          filteredPending.incoming.map((relation) => (
            <PendingRelationItem
              key={relation.id}
              name={relation.name}
              id={relation.id}
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

      case 'outgoing':
        return filteredPending.outgoing.length > 0 ? (
          filteredPending.outgoing.map((relation) => (
            <PendingRelationItem
              key={relation.id}
              name={relation.name}
              id={relation.id}
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
      case 'associated':
        return 'Associated Relations';
      case 'incoming':
        return 'Incoming Requests';
      case 'outgoing':
        return 'Outgoing Requests';
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Relations"
        subtitle="Manage your connections"
        icon={<FontAwesome name="users" size={24} color={Colors.primary} />}
      />
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
        onAdd={async (id) => {
          if (
            associatedRelations.some((r) => r.id === id) ||
            pendingRelations.some((r) => r.id === id)
          ) {
            throw new Error("This relation already exists");
          }
          setPendingRelations((prev) => [
            ...prev,
            {
              id,
              name: `User ${id}`,
              type: "outgoing",
            },
          ]);
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
    fontWeight: '600',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
