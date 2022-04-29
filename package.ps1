#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"
$latestImage="$($component.registry)/$($component.name):latest"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage -t $latestImage  .

if ($LastExitCode -ne 0 -and $env:RETRY -eq $true) {
    # if package failed and retries enabled run package script again
    Write-Host "Package failed, but retries enabled, so restarting package script again..."
    ./package.ps1
}

# Set environment variables
$env:IMAGE = $stageImage

# Set docker machine ip (on windows not localhost)
if ($env:DOCKER_IP -ne $null) {
    $dockerMachineIp = $env:DOCKER_IP
} else {
    $dockerMachineIp = "localhost"
}

try {
    # Workaround to remove dangling images
    docker-compose -f docker/docker-compose.yml down

    docker-compose -f docker/docker-compose.yml up -d

    # Test using curl
    Start-Sleep -Seconds 10
    #Invoke-WebRequest -Uri "http://$($dockerMachineIp):8080/heartbeat"
    #Invoke-WebRequest -Uri "http://$($dockerMachineIp):8080/v1/organizations/get_organizations" -Method POST

    Write-Host "The container was successfully tested."
} finally {
    # Workaround to remove dangling images
    docker-compose -f docker/docker-compose.yml down
}
