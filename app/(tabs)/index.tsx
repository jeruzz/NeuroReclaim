import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { calculateSavingsMetrics, calculateDopamineLevel } from "@/lib/recovery-calculations";

export default function HomeScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const [savingsData, setSavingsData] = useState<any>(null);
  const [dopamineLevel, setDopamineLevel] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  const { data: substanceConfig } = trpc.substanceConfig.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (substanceConfig && isAuthenticated) {
      try {
        const savings = calculateSavingsMetrics(
          substanceConfig.fechaInicioAbstinencia,
          1,
          parseFloat(substanceConfig.precioUnitario),
          substanceConfig.moneda,
          substanceConfig.tipoSustancia as "nicotina" | "metanfetamina",
          substanceConfig.unidad
        );
        setSavingsData(savings);

        const dopamine = calculateDopamineLevel(savings.diasSdeReferencia);
        setDopamineLevel(dopamine);
      } catch (error) {
        console.error("Error calculating metrics:", error);
      } finally {
        setLoadingData(false);
      }
    }
  }, [substanceConfig, isAuthenticated]);

  if (loading) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-6">
            <Text className="text-3xl font-bold text-foreground text-center">
              Bienvenido a NeuroReclaim
            </Text>
            <Text className="text-base text-muted text-center">
              Inicia sesión para comenzar tu viaje de recuperación
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth")}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 12,
              }}
            >
              <Text className="text-white font-semibold">Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Greeting */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">
              Hola, {user?.name || "Atleta"}
            </Text>
            <Text className="text-base text-muted">
              Tu camino hacia la recuperación
            </Text>
          </View>

          {/* Dopamine Level */}
          {dopamineLevel && (
            <View className="bg-primary rounded-2xl p-6 gap-3">
              <Text className="text-white font-semibold text-sm">Nivel Actual</Text>
              <Text className="text-white text-2xl font-bold">{dopamineLevel.nivel}</Text>
              <View className="bg-white/20 rounded-full h-2 overflow-hidden">
                <View
                  style={{
                    width: `${dopamineLevel.progreso}%`,
                    backgroundColor: "white",
                    height: "100%",
                  }}
                />
              </View>
              <Text className="text-white/80 text-xs">
                {dopamineLevel.progreso}% hacia el siguiente nivel
              </Text>
            </View>
          )}

          {/* Savings Metrics */}
          {savingsData && (
            <View className="gap-3">
              <MetricCard
                label="Dinero Ahorrado"
                value={`${savingsData.aherroDinero} ${savingsData.moneda}`}
                subtitle={`${savingsData.diasSdeReferencia} días de abstinencia`}
                colors={colors}
              />
              <MetricCard
                label="Cantidad Evitada"
                value={`${savingsData.cantidadEvitada} ${substanceConfig?.unidad}`}
                subtitle="Acumulado"
                colors={colors}
              />
              <MetricCard
                label="Tiempo Recuperado"
                value={`${savingsData.tiempoRecuperado} años`}
                subtitle="Vida recuperada"
                colors={colors}
              />
            </View>
          )}

          {/* Quick Actions */}
          <View className="gap-3 mt-4">
            <Text className="text-lg font-semibold text-foreground">Acciones Rápidas</Text>
            <View className="flex-row gap-3">
              <QuickActionButton
                label="Workout"
                onPress={() => {}}
                colors={colors}
              />
              <QuickActionButton
                label="Check-in"
                onPress={() => {}}
                colors={colors}
              />
              <QuickActionButton
                label="Emergencia"
                onPress={() => {}}
                colors={colors}
                variant="error"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function MetricCard({ label, value, subtitle, colors }: any) {
  return (
    <View className="bg-surface rounded-xl p-4 border border-border">
      <Text className="text-sm text-muted mb-1">{label}</Text>
      <Text className="text-2xl font-bold text-foreground mb-1">{value}</Text>
      <Text className="text-xs text-muted">{subtitle}</Text>
    </View>
  );
}

function QuickActionButton({ label, onPress, colors, variant = "primary" }: any) {
  const bgColor = variant === "error" ? colors.error : colors.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flex: 1,
        backgroundColor: bgColor,
        paddingVertical: 12,
        borderRadius: 8,
      }}
    >
      <Text className="text-white font-semibold text-center text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
