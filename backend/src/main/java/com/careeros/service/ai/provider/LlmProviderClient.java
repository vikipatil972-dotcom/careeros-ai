package com.careeros.service.ai.provider;

public interface LlmProviderClient {

    String getProviderName();

    String generateRewrite(String originalContent, String sectionName, String stylePreset, String targetRoleTitle);
}
