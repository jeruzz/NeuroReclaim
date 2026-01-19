import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  if (loading) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (isAuthenticated && user) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 gap-6">
            {/* Welcome Section */}
            <View className="items-center gap-2 mt-8">
              <Text className="text-4xl font-bold text-foreground">Bienvenido</Text>
              <Text className="text-base text-muted text-center">
                {user.name || user.email || "Usuario"}
              </Text>
            </View>

            {/* User Info Card */}
            <View className="w-full bg-surface rounded-2xl p-6 border border-border">
              <Text className="text-sm text-muted mb-2">Email</Text>
              <Text className="text-lg font-semibold text-foreground mb-4">
                {user.email}
              </Text>
              <Text className="text-sm text-muted mb-2">Rol</Text>
              <Text className="text-lg font-semibold text-foreground">
                Usuario
              </Text>
            </View>

            {/* Next Steps */}
            <View className="gap-3 mt-4">
              <Pressable
                onPress={() => router.push("/(tabs)")}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-center font-semibold text-white">
                  Ir a la Aplicación
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setShowLogout(!showLogout)}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.surface,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-center font-semibold text-foreground">
                  Cerrar Sesión
                </Text>
              </Pressable>

              {showLogout && (
                <Pressable
                  onPress={async () => {
                    await logout();
                    setShowLogout(false);
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.error,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-center font-semibold text-white">
                    Confirmar Cierre de Sesión
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8">
          {/* Hero Section */}
          <View className="items-center gap-4 mt-12">
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: colors.primary,
                borderRadius: 16,
              }}
            />
            <Text className="text-4xl font-bold text-foreground text-center">
              NeuroReclaim
            </Text>
            <Text className="text-base text-muted text-center">
              Tu camino hacia la recuperación
            </Text>
          </View>

          {/* Features */}
          <View className="gap-4">
            <FeatureCard
              title="Monitoreo de Recuperación"
              description="Visualiza tu progreso con métricas claras y motivadoras"
              colors={colors}
            />
            <FeatureCard
              title="Seguimiento de Fitness"
              description="Registra tus workouts y celebra cada logro"
              colors={colors}
            />
            <FeatureCard
              title="Soporte Clínico"
              description="Conecta con tu terapeuta de forma segura"
              colors={colors}
            />
          </View>

          {/* CTA */}
          <View className="gap-3 mt-auto mb-6">
            <Text className="text-sm text-muted text-center">
              Inicia sesión para comenzar tu viaje de recuperación
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function FeatureCard({
  title,
  description,
  colors,
}: {
  title: string;
  description: string;
  colors: any;
}) {
  return (
    <View className="bg-surface rounded-xl p-4 border border-border">
      <Text className="text-lg font-semibold text-foreground mb-1">{title}</Text>
      <Text className="text-sm text-muted">{description}</Text>
    </View>
  );
}
