import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const HealthMetrics = () => {
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu'],
    datasets: [
      {
        data: [3, 4, 2, 3],
      },
    ],
  };

  const pieData = [
    {
      name: 'Active',
      population: 60,
      color: '#FF7F50',
    },
    {
      name: 'Rest',
      population: 30,
      color: '#8B4513',
    },
    {
      name: 'Other',
      population: 10,
      color: '#40E0D0',
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      <View style={styles.chartsContainer}>
        <BarChart
          data={barData}
          width={Dimensions.get('window').width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 127, 80, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
      <Text style={styles.activityText}>
        Recent Activities: You covered 12 miles this week.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartsContainer: {
    marginVertical: 15,
  },
  activityText: {
    color: '#666',
  },
});

export default HealthMetrics; 