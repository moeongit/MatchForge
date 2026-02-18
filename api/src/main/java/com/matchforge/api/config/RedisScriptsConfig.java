package com.matchforge.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.script.DefaultRedisScript;

@Configuration
public class RedisScriptsConfig {

    @Bean
    DefaultRedisScript<Long> acquirePairLocksScript() {
        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setResultType(Long.class);
        script.setScriptText("""
                if redis.call('EXISTS', KEYS[1]) == 1 or redis.call('EXISTS', KEYS[2]) == 1 then
                  return 0
                end
                redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
                redis.call('SET', KEYS[2], ARGV[1], 'EX', ARGV[2])
                return 1
                """);
        return script;
    }

    @Bean
    DefaultRedisScript<Long> dequeuePairScript() {
        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setResultType(Long.class);
        script.setScriptText("""
                if redis.call('ZSCORE', KEYS[1], ARGV[1]) == false then
                  return 0
                end
                if redis.call('ZSCORE', KEYS[1], ARGV[2]) == false then
                  return 0
                end
                redis.call('ZREM', KEYS[1], ARGV[1], ARGV[2])
                redis.call('DEL', KEYS[2], KEYS[3])
                return 1
                """);
        return script;
    }
}
