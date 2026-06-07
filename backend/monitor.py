#!/usr/bin/env python3
"""
Real-time monitoring dashboard for Growth Ops Hub Chatbot
Reads and analyzes logs in real-time
"""

import json
import os
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict

class LogAnalyzer:
    def __init__(self, log_dir: str = "logs"):
        self.log_dir = Path(log_dir)
    
    def read_recent_logs(self, filename: str, minutes: int = 5) -> list:
        """Read logs from the last N minutes"""
        log_file = self.log_dir / filename
        if not log_file.exists():
            return []
        
        cutoff_time = datetime.utcnow() - timedelta(minutes=minutes)
        logs = []
        
        try:
            with open(log_file, 'r') as f:
                for line in f:
                    try:
                        log_entry = json.loads(line)
                        log_time = datetime.fromisoformat(log_entry.get('timestamp', ''))
                        if log_time > cutoff_time:
                            logs.append(log_entry)
                    except json.JSONDecodeError:
                        continue
        except Exception as e:
            print(f"Error reading {filename}: {e}")
        
        return logs
    
    def get_stats(self) -> dict:
        """Calculate current statistics"""
        access_logs = self.read_recent_logs("access.log", minutes=60)
        error_logs = self.read_recent_logs("error.log", minutes=60)
        
        # Response time stats
        response_times = [
            log.get('response_time_ms', 0) 
            for log in access_logs 
            if 'response_time_ms' in log
        ]
        
        # Query stats
        query_count = len([l for l in access_logs if 'Query' in l.get('message', '')])
        response_count = len([l for l in access_logs if 'Response' in l.get('message', '')])
        error_count = len(error_logs)
        
        # Calculate averages
        avg_response_time = sum(response_times) / len(response_times) if response_times else 0
        min_response_time = min(response_times) if response_times else 0
        max_response_time = max(response_times) if response_times else 0
        
        # IP stats
        ip_counts = defaultdict(int)
        for log in access_logs:
            if 'user_ip' in log and log['user_ip']:
                ip_counts[log['user_ip']] += 1
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "queries_last_hour": query_count,
            "responses_last_hour": response_count,
            "errors_last_hour": error_count,
            "average_response_time_ms": round(avg_response_time, 2),
            "min_response_time_ms": round(min_response_time, 2),
            "max_response_time_ms": round(max_response_time, 2),
            "unique_ips": len(ip_counts),
            "top_ips": dict(sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)[:5])
        }
    
    def print_dashboard(self):
        """Print formatted dashboard"""
        stats = self.get_stats()
        
        print("\n" + "="*60)
        print("📊 GROWTH OPS HUB CHATBOT - MONITORING DASHBOARD")
        print("="*60)
        print(f"\nTime: {stats['timestamp']}\n")
        
        print("📈 ACTIVITY (Last 60 minutes)")
        print(f"  Queries:     {stats['queries_last_hour']}")
        print(f"  Responses:   {stats['responses_last_hour']}")
        print(f"  Errors:      {stats['errors_last_hour']}")
        
        print("\n⏱️  PERFORMANCE METRICS")
        print(f"  Average:     {stats['average_response_time_ms']}ms")
        print(f"  Minimum:     {stats['min_response_time_ms']}ms")
        print(f"  Maximum:     {stats['max_response_time_ms']}ms")
        
        print("\n👥 CLIENT DISTRIBUTION")
        print(f"  Unique IPs:  {stats['unique_ips']}")
        for ip, count in stats['top_ips'].items():
            print(f"    {ip}: {count} requests")
        
        # Health status
        health_status = "🟢 HEALTHY" if stats['errors_last_hour'] < 5 else "🟡 WARNING"
        print(f"\n{health_status}")
        print("="*60 + "\n")

if __name__ == "__main__":
    analyzer = LogAnalyzer("backend/logs")
    
    # Print once
    analyzer.print_dashboard()
    
    # Optional: Continuous monitoring
    print("Press Ctrl+C to exit\n")
    try:
        import time
        while True:
            time.sleep(30)  # Refresh every 30 seconds
            os.system('cls' if os.name == 'nt' else 'clear')
            analyzer.print_dashboard()
    except KeyboardInterrupt:
        print("\n✋ Monitoring stopped\n")
