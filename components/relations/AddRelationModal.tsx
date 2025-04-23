import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable,
  ActivityIndicator
} from 'react-native';
import Colors from '../../constants/Colors';

interface AddRelationModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (id: string, setStatus?: (status: { type: 'success' | 'error'; message: string }) => void) => Promise<void>;
}

const AddRelationModal = ({ visible, onClose, onAdd }: AddRelationModalProps) => {
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleTextChange = (text: string) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    setId(numericText);
    setError('');
    setStatus(null);
  };

  const handleAdd = async () => {
    if (!id.trim()) {
      setError('Please enter an ID');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await onAdd(id.trim(), setStatus);
      setId('');
      // Don't close immediately; let user see the status
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add relation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStatus(null);
    setId('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Relation</Text>
          <Text style={styles.subtitle}>Enter the account ID of the person you want to connect with</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Account ID"
            value={id}
            onChangeText={handleTextChange}
            placeholderTextColor={Colors.textLight}
            keyboardType="numeric"
            maxLength={10}
          />
          
          {error ? <Text style={styles.error}>{error}</Text> : null}
      {status && (
        <Text style={[styles.status, status.type === 'success' ? styles.statusSuccess : styles.statusError]}>{status.message}</Text>
      )}

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.addButton]}
              onPress={handleAdd}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.background} />
              ) : (
                <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  status: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  statusSuccess: {
    color: Colors.success,
  },
  statusError: {
    color: Colors.error,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  error: {
    color: Colors.error,
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  addButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  addButtonText: {
    color: Colors.background,
  },
  cancelButtonText: {
    color: Colors.background,
  },
});

export default AddRelationModal; 